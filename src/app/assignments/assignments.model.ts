export class Assignments {
  _id!: string;
  id!: number;
  nom!: string;
  dateRendu!: Date;
  rendu!: boolean;
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
