import * as userInterface from '../models/interface/user.interface';
import * as DBUtil from '../utils/db.util';
import { PoolClient } from 'pg';
import { getErrorMessage } from '../utils/error.util';
import bycrpt from 'bcrypt'
import { sendEmailVerification } from '../utils/email.util';
import { error } from 'node:console';
import { generateAccessToken } from '../utils/token.util';
import { TokenTableName } from '../models/enums/auth.enum';
import { generateTokenTable } from './auth.service';


export const createUser = async ({
    user,
    role 
}:{
    user: userInterface.User 
    role: userInterface.Role   
}) =>{
    let client: PoolClient | undefined;
    try{
        client = await DBUtil.startTransaction()
        const existing_user = await DBUtil.query("SELECT id FROM user WHERE email = $1", [user.email], client);

        if(existing_user.length){
            throw new Error("User with that account already exists");
        }

        const hashedPassword = await bycrpt.hash(user.password, 10);

        const userQuery = 
            `INSERT INTO "user"(role_id, name, email, password, dob, address, is_active, is_verified, created_at)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING role_id, name , email, password, dob, address, true, false, NOW()`;

        const params = [
            user.role_id, 
            user.name, 
            user.email, 
            hashedPassword, 
            user.dob, 
            user.address, 
            user.is_active, 
            user.is_verified, 
            user.created_at
        ];

        const createUser = await DBUtil.query(userQuery, params, client);
        
        //Let controllers handle this
        const verificationToken = await generateTokenTable({
            userId: createUser[0].userId,
            client: client,
            tableName: TokenTableName.EMAIL
        })

        await sendEmailVerification({
            email: user.email,
            token: verificationToken
        }); 
        
        DBUtil.commitTransaction(client);

        return createUser[0];

    }catch(error){
        if(client){

            await DBUtil.rollbackTransactions(client);
        }

        throw new Error(getErrorMessage(error));
    }     
};

