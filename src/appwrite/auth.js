import config from '../config/config';
import {Client, Account, ID} from 'appwrite';

class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
           return  userAccount ? this.loginAccount({email, password}) : userAccount;
        } catch (error) {
            throw error;
        }
    }

    async loginAccount({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logoutAccount(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Serive :: logoutAccount :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;