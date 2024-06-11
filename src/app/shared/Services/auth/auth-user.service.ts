import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usermanage } from '../../Models/userModel';
import { Observable } from 'rxjs';
import { environment } from '../../Models/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private url = environment.apiUrl + '/usuarios';

  constructor(private http: HttpClient) {}

  // Crear Usuario
  addUser(user: Usermanage): Observable<any> {
    return this.http.post<any>(`${this.url}/create`, user);
  }

  // Editar Usuario
  editUser(userId: string, user: Usermanage): Observable<Usermanage> {
    return this.http.put<Usermanage>(`${this.url}/edit/${userId}`, user);
  }

  // Obtener detalles de un usuario por ID
  getUserById(userId: string): Observable<Usermanage> {
    return this.http.get<Usermanage>(`${this.url}/details/${userId}`);
  }

  // Obtener todos los usuarios activos
  getAllActiveUsers(): Observable<Usermanage[]> {
    return this.http.get<Usermanage[]>(`${this.url}/active`);
  }

  // Obtener detalles de un usuario por identificación
  getUserDetailsByIdentificacion(
    identificacion: string
  ): Observable<Usermanage> {
    return this.http.get<Usermanage>(
      `${this.url}/detailsByIdentificacion/${identificacion}`
    );
  }

  // Obtener detalles de un usuario por nombre
  getUserDetailsByName(nombre: string): Observable<Usermanage[]> {
    return this.http.get<Usermanage[]>(`${this.url}/detailsByName/${nombre}`);
  }

  // Cambiar el estado del usuario a inactivo
  deactivateUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.url}/deactivate/${userId}`, {});
  }
}
