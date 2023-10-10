import { Router } from 'express';
import crypto from 'crypto'
import  {modeloUsuarios}  from '../models/usuarios.models.js';
import passport from 'passport';
export const router=Router()

router.get('/github', passport.authenticate('github',{}),(req,res)=>{})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:'/sessions/errorGithub'}),(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Login OK',
        usuario: req.user
    });
});

router.get('/errorGithub',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error en Github'
    });
});

router.get('/errorRegistro',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error de registro'
    });
});

router.post('/registro',passport.authenticate('registro',{failureRedirect:'/sessions/errorRegistro'}),async(req,res)=>{

    let {nombre, email, password,role}=req.body

    console.log(req.user)

    res.redirect(`/login?usuarioCreado=${email}`)
})

router.get('/errorLogin',(req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        error:'Error Login'
    });
});


router.post('/login', passport.authenticate('login',{failureRedirect:'/sessions/errorLogin'}),async(req,res)=>{


    console.log(req.user)

    req.session.usuario=req.user


    res.redirect('/products')

    
});


router.get('/logout',(req,res)=>{

    req.session.destroy(e=>console.log(e))

    res.redirect('/login?mensaje=logout correcto...!!!')

});