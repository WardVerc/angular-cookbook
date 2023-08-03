import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

// the interceptor can intercept any request that is send, and modify it
// this case we want to add the user.token if logged in to every request
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // we want to get the user first and then do any other request
    // pipe returns an observable where we can subscribe to
    return this.authService.user.pipe(
      // take(1) subscribes only 1 time and unsubscribes when the user is retrieved
      take(1),
      // exhaustMap will use the first observable retrieved before and let's you change the observable to something else
      // this way we can use 'user' in the bv. fetchRecipes call, the observable is changed to Recipe[]
      exhaustMap((user) => {
        // if not logged in, just pass the original request on
        if (!user) {
          return next.handle(req);
        }
        //if logged in, add user token to params of the request
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
