import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '../../models/note';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {

  @Input() notes!: Note[]; //Receives a list of Note objects from the parent component

  displayedColumns: string[] = ['id', 'title', 'date' ]; //An array of strings defining what columns should be shown
  dataSource!: MatTableDataSource<Note>; //NG Material table wrapper, it handles filtering, sorting, page tracking, etc.

  constructor() { }

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Searches HTML for paginators
  @ViewChild(MatSort) sort!: MatSort; //Searches HTML for sorters

  //After HTML is loaded, loads the paginator and sort
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Immediately instantiates the notes array inside MatTableDataSource instance wrapper
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  //Executed whenever text is typed in the input field
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; //Reads string input from text field
    this.dataSource.filter = filterValue.trim().toLowerCase(); //Filters all data through the given input (lowercase to avoid capitalization errors)
  }

}
