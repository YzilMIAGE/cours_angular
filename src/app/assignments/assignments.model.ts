export class Assignments {
  _id!: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu!: boolean;
  auteur!: string;
  remarques!: string;
  subjectId!: string;
  note!: number;
}

export class AssignmentsPaginate {
  page!: number;
  limit!: number;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
  docs!: Assignments[];
}
