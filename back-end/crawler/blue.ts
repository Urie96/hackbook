import request from 'superagent';

async function dailySign(qq: string) {
  const agent = request.agent();
  console.log(qq);
  const res = await agent
    .post('https://www.linguomm.xyz/wp-admin/admin-ajax.php')
    .send(
      `user_login=${qq}%40qq.com&password=youling&rememberme=1&redirect=https%3A%2F%2Flinguomm.xyz%2F&action=userlogin_form&token=ad00105b93`
    );
  console.log(JSON.parse(res.text));
  const res2 = await agent
    .post('https://www.linguomm.xyz/wp-admin/admin-ajax.php')
    .send('action=daily_sign');
  console.log(JSON.parse(res2.text));
}

const phones = [
  '1043629668',
  '562485565',
  '1378108569',
  '1378108570',
  '1378108571',
  '1378108572',
  '1378108573',
  '1378108574',
  '1378108575',
  '1378108576',
  '1378108577',
  '1378108578',
];

try {
  phones.forEach(dailySign);
  setInterval(() => phones.forEach(dailySign), 1000 * 3600 * 24);
} catch (error) {
  console.log(error.message);
}
