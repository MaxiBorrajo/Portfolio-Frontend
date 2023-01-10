import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditSkillRoutingModule } from './edit-skill-routing.module';
import { EditSkillComponent } from './edit-skill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EditSkillComponent
  ],
  imports: [
    CommonModule,
    EditSkillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class EditSkillModule { }
