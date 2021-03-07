const fs = require('fs');
const file = 'accounts.txt';

var main = async () => {
    var data = '';
    var script = '';
    var accounts = fs.readFileSync(file).toString().split("\n");
    accounts.forEach(x => {
        var accountId = x.trim().toString().toUpperCase();
        if(accountId.length > 0){
            console.log(x)
            data += "[";
            data += "profile ";
            data += accountId;
            data += "]".toString();
            data += "\n";
            data += `sso_start_url = https://d-9267159c7d.awsapps.com/start#/\n`;
            data += `sso_region = us-west-2\n`;
            data += `sso_account_id = ${x}\n`;
            data += `sso_role_name = AdministratorAccess\n`;
            data += `region = us-west-2\n`;
            data += `output = json\n`;
            data += `\n`;
            script += `aws cloudformation create-stack --stack-name IntelligentDiscoveryRole --template-body file://iamRole.template.json --capabilities CAPABILITY_NAMED_IAM --profile ${accountId}\n`
        }
    });

    fs.writeFileSync('config', data, "utf8");
    fs.writeFileSync('script', script, "utf8");
    console.log(data);
}

main();