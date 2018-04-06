import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";

import { CanvasContainerComponent } from "./canvas-components/canvas-container/canvas-container.component";

const routes: Routes = [
  { path: "", component: CanvasContainerComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class InviteBuilderRoutingModule { }
