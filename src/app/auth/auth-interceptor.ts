import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable} from '@angular/core'
import {AuthService} from "./auth.service"

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        // Primero se obtiene el Token desde la solicitud
        const authToken = this.authService.getToken();
        // Lo siguiente es manipular la solicitud para mantener ese token
        // Clonar la solicitud, por que si se añade directmente, se causaran efectos secundarios internamente
        // Se clona para crear una copia de la solicitud y pasar la configuración al clon y editarlo
        // Editar los headers (cabeceras) y agregar uno nuevo
        // Headers originales y además agregar un extra
        const authRequest = req.clone({ 
            // El método set no anula los headers, sólo añade nuevos y establece valores
            // Si existiera un header lo sobrescribe
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        return next.handle(authRequest );
    }
}