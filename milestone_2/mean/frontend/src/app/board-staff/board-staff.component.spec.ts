import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardStaffComponent } from './board-staff.component';

describe('BoardModeratorComponent', () => {
  let component: BoardStaffComponent;
  let fixture: ComponentFixture<BoardStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
