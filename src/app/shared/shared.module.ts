import { NgModule } from '@angular/core';
import { ClassPipe } from './pipes/class.pipe';
import { RolePipe } from './pipes/role.pipe';


@NgModule({
  declarations: [RolePipe, ClassPipe],
  imports: [],
  providers: [],
  exports: [RolePipe, ClassPipe],
})
export class SharedModule {}
