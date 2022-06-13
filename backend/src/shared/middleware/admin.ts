import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Global } from '../../models/Global';
import { Admin } from '../models';

export class AdminMethod {
    private static JWT_SCRET: string = 'zacao';
    private static expiresIn: string = '30d'

    // 密码加密
    static cryptPwd(pwd: string): string {
        const _salt = bcryptjs.genSaltSync(10);
        return bcryptjs.hashSync(pwd, _salt)
    }

    // 验证密码
    static comparePwd(inputPwd: string, dbPwd: string): boolean {
        return bcryptjs.compareSync(inputPwd, dbPwd)
    }

    // 生成token
    static genToken(admin: Admin): string {
        let { password, ...res } = admin
        return jwt.sign(res, this.JWT_SCRET, { expiresIn: this.expiresIn })
    }

    // 验证token
    static async verifyToken(token: string): Promise<any> {
        try {
            const admin = jwt.verify(token, this.JWT_SCRET)

            let op = await Global.collection('Admin').findOne({ username: (admin as Admin).username })
            if (!op) {
                console.error('can not find admin by token');
                return null
            } else {
                let { _id, password, ...res } = op
                return {
                    _id: _id.toHexString(),
                    ...res
                }
            }
        } catch (err: any) {
            switch (err.name) {
                case 'TokenExpiredError':
                    console.error('token expired');
                    break;
                case 'JsonWebTokenError':
                    console.error('token error');
                    break

                default:
                    console.error('verify token fail');
                    break;
            }
            return null
        }
    }
}