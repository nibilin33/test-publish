const semver = require('semver');
const {
    execSync
} = require('child_process');
const test = '@nibilin33/test-publish@1.0.1';
async function getTargetVersions(pkname) {
    const lastVersion = /\.\d+$/;
    const queryVersion = pkname.replace(lastVersion,'.x');
    console.log(pkname,queryVersion);
    const remoteVersions = execSync(`npm view ${queryVersion} versions`);
    const versions = remoteVersions.toString().split('\n').map((name)=>{
        const reg = /\d+\.\d+\.\d+/;
        const result = reg.exec(name);
        return result ?  result[0]: null;
    }).filter((rs)=>rs);
    console.log(semver.sort(versions));
}
getTargetVersions(test);