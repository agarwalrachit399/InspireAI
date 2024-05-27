import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import  User from "@models/user";
import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callback: {
        async session({ session}) {
            const sessionUser = await User.findOne({ email: session.user.email });
    
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}) {
            try {
                await connectToDatabase();
    
                const userExists = await User.findOne({ 
                    email: profile.email 
                });
    
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.email.split("@")[0],
                        name: profile.name,
                        image: profile.picture,
                    });
                
                }
    
                return true;
            } catch (error) {
                console.log('error signing in', error);
                return false;
            }
    
        }
    }
   
});

export {handler as GET, handler as POST}