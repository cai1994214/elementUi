import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
 
import { LoginUsers, Users } from './data/user';
 
export default {
 
    init() {
        let mock = new MockAdapter(axios)
            // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        })
 
        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        })
 
        // 登录
        mock.onPost('/user/login').reply(config => {
            let {name, password} = JSON.parse(config.data);//传参
            return new Promise((resolve, reject) => {
              let user = null;
              setTimeout(() => {
                let hasUser = LoginUsers.some(u => {
                  if (u.username === name && u.password === password) {
                    user = JSON.parse(JSON.stringify(u));
                    user.password = undefined;
                    return true;
                  }
                });
                if (hasUser) {
                  resolve([200, { code: 200, msg: '请求成功', user }]);
                } else {
                  resolve([200, { code: 500, msg: '账号或密码错误' }]);
                }
              }, 1000);
            });
        })
        //获取user
        mock.onPost('/news/index').reply(200,{
          users:Users
        })
 
 
 
    }
 
}