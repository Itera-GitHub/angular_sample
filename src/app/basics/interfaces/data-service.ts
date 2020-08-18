import {FormGroup} from '@angular/forms';

export interface DataService {
  getData (params: object) ;
  putData (id: number, data: object, form: FormGroup, isFormData?: boolean);
  postData (data: object, form: FormGroup, isFormData?: boolean);
  getDataById (id: number);
  deleteRow (id: number);
  deleteAll (id: any);
  exportCsv (params: any);
  getResponse?(params?: object, debounce?: boolean);
}