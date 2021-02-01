import request from 'superagent';

async function sign(qq: string) {
  try {
    const agent = request.agent();
    console.log(qq);
    const html = await agent.get('https://www.linguomm.xyz/login');
    const token = html.text.match(/name="token" value="(\w+)"/)[1];
    const res = await agent
      .post('https://www.linguomm.xyz/wp-admin/admin-ajax.php')
      .send(
        `user_login=${qq}%40qq.com&password=youling&rememberme=1&redirect=https%3A%2F%2Flinguomm.xyz%2F&action=userlogin_form&token=${token}`
      );
    console.log(JSON.parse(res.text));
    const res2 = await agent
      .post('https://www.linguomm.xyz/wp-admin/admin-ajax.php')
      .send('action=daily_sign');
    console.log(JSON.parse(res2.text));
  } catch (error) {
    console.log(error.message);
  }
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

function dailySign() {
  let nextTime = new Date().setHours(8, 0) - new Date().valueOf();
  if (nextTime < 0) nextTime += 1000 * 3600 * 24;
  setTimeout(() => {
    console.log(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
    phones.forEach(sign);
    dailySign();
  }, nextTime);
}

dailySign();
