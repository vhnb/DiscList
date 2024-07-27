import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth"
export const authOptions = {

    providers: [
        DiscordProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        })
    ],
}
export default NextAuth(authOptions)