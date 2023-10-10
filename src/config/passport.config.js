import passport from 'passport'
import local from 'passport-local'
import github from 'passport-github2'
import crypto from 'crypto'
import { modeloUsuarios } from '../models/usuarios.models.js';
import { generaHash, validaHash } from '../utils.js';

export const inicializaPassport=()=>{

     // estrategias
     passport.use('github', new github.Strategy(
        {
            clientID: 'Iv1.57172691f62bef81', 
            clientSecret: '2a4922cf430c68357a0c443e32634bd6bcb45a24',
            callbackURL: 'http://localhost:8080/products'
        },
        async(token, tokenRefresh, profile, done)=>{
            try {
                console.log(profile)
                let usuario=await modeloUsuarios.findOne({email:profile._json.email})
                if(!usuario){
                    usuario=await modeloUsuarios.create({
                        nombre: profile._json.name,
                        email: profile._json.email,
                        github: profile
                    })
                }

                done(null, usuario)


            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('registro', new local.Strategy(
        {
            usernameField:'email', passReqToCallback:true
        },
        async(req, username, password, done)=>{
            try {

                // logica de registro
                let {nombre, email, password}=req.body


                if(!nombre || !email || !password){
                    done(null, false)
                }
            
                let existe=await modeloUsuarios.findOne({email})
                if(existe){
                    done(null, false)
                }
            
                let role = 'usuario'; // Por defecto, el rol es "usuario"
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    role = 'admin'; // Asignar el rol de administrador
                }

                let usuario=await modeloUsuarios.create({
                    nombre, email, role,
                    password: generaHash(password)
                })

                console.log('pasando x passport registro...!!!')

                done(null, usuario)
            
            } catch (error) {
                done(error)
            }
        }
    ))


    passport.use('login', new local.Strategy(
        {
            usernameField:'email'
        },
        async(username, password, done)=>{
            try {
                if(!username || !password) {
                    return done(null, false)
                }
                let usuario=await modeloUsuarios.findOne({email:username})
                if(!usuario){

                    return done(null, false)
                }else{
                    if(!validaHash(usuario, password)){
                        // clave invalida
                        return done(null, false)
                    }
                }

                usuario={
                    nombre: usuario.nombre, 
                    email: usuario.email, 
                    _id: usuario._id,
                    rol: usuario.rol
                }

                return done(null, usuario)
            
            } catch (error) {
                // done(error, null)
                return done(error)
            }
        }
    ) )

    passport.serializeUser((ususario, done)=>{
        return done(null, ususario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await modeloUsuarios.findById(id)
        return done(null, usuario)
    })

} // fin de inicializaPassport