import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            // { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }, // charts
            // {
            //     path: 'dashboard',
            //     loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            // },  charts
            { path: 'dashboard', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
