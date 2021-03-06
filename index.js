const axios = require('axios');
const UserName = 'user';
const PassWord = 'password';
const myDomain = 'domain'

var main = async () => {
    console.log(process.argv);
    var info = await login(UserName, PassWord);
    var accountId = process.argv[2]
    var accountName = process.argv[3];
    createAccount = await addAccount(info, accountId, accountName);


}

var login = () => new Promise(async (resolve) => {
    const url = `https://${myDomain}.intelligentdiscovery.io/api/authenticate`;
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    var data = {
        username: UserName,
        password: PassWord
    }
    var response = await axios.post(url, data, headers);
    console.log(JSON.stringify(response.data, null, 2));
    resolve(response.data.token);
});

var addAccount = (token, accountId, accountName) => new Promise(async (resolve) => {
    console.log(token, accountId, accountName);
    const url = `https://${myDomain}.intelligentdiscovery.io/api/admin/awsaccounts`;
    var headers = {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
        }
    }
    var role = {
        accountId: accountId,
        accountName: accountName,
        RoleArn: `arn:aws:iam::${accountId}:role/IntelligentDiscovery-Security-Audit`,
        status: "active",
        offering: "advanced"
    };
    var response = await axios.post(url, role, headers);
    console.log(JSON.stringify(response.data, null, 2));
    resolve(response.data.token);
});
main();