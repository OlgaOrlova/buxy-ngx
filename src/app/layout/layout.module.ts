import { NgModule } from "@angular/core";

import { MaterialComponentsModule } from "../material/material.module";

import { DrawerComponent } from "./drawer/drawer.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

@NgModule({
  imports: [MaterialComponentsModule],
  declarations: [DrawerComponent, ToolbarComponent, AboutDialogComponent],
  entryComponents: [AboutDialogComponent],
  exports: [DrawerComponent]
})
export class LayoutModule {}
