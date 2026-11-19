"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const os=require("node:os");
const path=require("node:path");
const {spawnSync}=require("node:child_process");

const root=path.resolve(__dirname,"..");
const target=path.join(__dirname,"tournament-organizer-portal.browser-smoke.cjs");

const dir=fs.mkdtempSync(path.join(os.tmpdir(),"scoutsa-tm013-"));
const sentinel=path.join(dir,"cleanup.txt");
try {
  const child=spawnSync(process.execPath,["--test",target],{
    cwd:path.resolve(root,".."),
    encoding:"utf8",
    timeout:60000,
    env:{...process.env,SCOUTSA_TM013_FORCE_ASSERTION_FAILURE:"1",SCOUTSA_TM013_CLEANUP_SENTINEL:sentinel}
  });
  assert.equal(child.error,undefined,"failure-injection child must complete without a process-level spawn error");
  assert.notEqual(child.status,0,"deliberate assertion failure must make the child test fail");
  assert.match(child.stdout+child.stderr,/TM-013 deliberate assertion-failure injection/,"child must fail at the deliberate assertion");
  assert.equal(fs.readFileSync(sentinel,"utf8"),"browser-close-finally-reached",
    "browser.close() finally path must complete after an assertion failure");
  console.log("PASS: TM-013 deliberate assertion failure exits non-zero and reaches browser cleanup");
} finally {
  fs.rmSync(dir,{recursive:true,force:true});
}
