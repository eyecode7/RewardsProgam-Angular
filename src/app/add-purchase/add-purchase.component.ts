import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseService } from '../services/purchase.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent {

  purchaseForm: FormGroup;

  constructor(
   private _fb: FormBuilder,
   private _purchaseService: PurchaseService,
   private _dialogRef: MatDialogRef<AddPurchaseComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _coreService: CoreService
 ) {
   this.purchaseForm = this._fb.group({
     name: '',
     email: '',
     purchaseAmount: '',
     createdDate: ''

   });
 }

 ngOnInit(): void {
   this.purchaseForm.patchValue(this.data);
 }

 onFormSubmit() {
   if (this.purchaseForm.valid) {
console.log(this.purchaseForm.value);

     if (this.data) {
       this._purchaseService
         .updatePurchase(this.data.purchaseId, this.purchaseForm.value)
         .subscribe({
           next: (val: any) => {
             this._coreService.openSnackBar('Purchase updated!');
             this._dialogRef.close(true);
           },
           error: (err: any) => {
             console.error(err);
           },
         });
     } else {
          //alert("add purchase");
          this._coreService.openSnackBar('Purchase added successfully');
          this._dialogRef.close(true);
       this._purchaseService.addPurchase(this.purchaseForm.value).subscribe({
         next: (val: any) => {
           ///NOT going into this code. Need to look at,,
           console.log("Inside purchase")
           this._coreService.openSnackBar('Purchase added successfully');
           this._dialogRef.close(true);
         },

         error: (err: any) => {
           console.error(err);
         },
       });
     }
   }
 }


}
