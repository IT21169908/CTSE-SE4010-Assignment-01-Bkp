import * as express from 'express';
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import passport from "passport";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET ?? '',
    // issuer: 'it21156410@my.sliit.lk',
    // audience: 'https://www.sliit.lk/',
}

export default async function startupPassport(app: express.Application) {
    app.use(passport.initialize());
    app.use(passport.session());

}
