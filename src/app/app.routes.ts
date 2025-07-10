import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'usuario/:id',
        component: ViewUserComponent
    },
    {
        path: 'criar-usuario',
        component: CreateUserComponent
    },
    {
        path: 'atualizar-usuario/:id',
        component: UpdateUserComponent
    },
    {
        path: '**',
        component: HomeComponent
    }
];
