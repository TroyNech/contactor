import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss'],
})
export class ContactDataComponent implements OnInit {
  @Input() contactData: Object;
  @Input() disableEmail: Boolean;
  @Output() dataToSet = new EventEmitter();
  public contactInfo: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.contactInfo = this.formBuilder.group({
      email: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumbers: this.formBuilder.array([]),
      websites: this.formBuilder.array([]),
      organization: [''],
      position: ['']
    });
  }

  async ngOnInit() {
   // console.log(this.contactData);

    if (this.disableEmail) {
      this.contactInfo.get("email").disable();
    }

    try {
      this.contactInfo.get("email").setValue(this.contactData['email']);
      this.contactInfo.controls.firstName.setValue(this.contactData['firstName']);
      this.contactInfo.controls.lastName.setValue(this.contactData['lastName']);
      this.contactInfo.controls.organization.setValue(this.contactData['organization']);
      this.contactInfo.controls.position.setValue(this.contactData['position']);
    } catch (e) { }

    if (this.contactData['phoneNumbers'] !== undefined && this.contactData['phoneNumbers'][0] !== undefined) {
      this.addPhoneForm(this.contactData['phoneNumbers'][0]['type'], this.contactData['phoneNumbers'][0]['number']);
      for (let i = 1; i < this.contactData['phoneNumbers'].length; i++) {
        this.addPhoneForm(this.contactData['phoneNumbers'][i]['type'], this.contactData['phoneNumbers'][i]['number']);
      }
    } else {
      this.addPhoneForm("", "");
    }

    if (this.contactData['websites'] !== undefined && this.contactData['websites'][0] !== undefined) {
      this.addWebsiteForm(this.contactData['websites'][0]);
      for (let i = 1; i < this.contactData['websites'].length; i++) {
        this.addWebsiteForm(this.contactData['websites'][i]);
      }
    } else {
      this.addWebsiteForm("");
    }

    /*
    //new user who does not have any data other then email
    if (this.contactData['phoneNumbers'] === undefined) {
      this.addPhoneForm("", "");
      this.addWebsiteForm("");
      return;
    }
    
    this.addPhoneForm(this.contactData['phoneNumbers'][0]['type'], this.contactData['phoneNumbers'][0]['number']);
    for (let i = 1; i < this.contactData['phoneNumbers'].length; i++) {
      this.addPhoneForm(this.contactData['phoneNumbers'][i]['type'], this.contactData['phoneNumbers'][i]['number']);
    }

    this.addWebsiteForm(this.contactData['websites'][0]);
    for (let i = 1; i < this.contactData['websites'].length; i++) {
      this.addWebsiteForm(this.contactData['websites'][i]);
    }

     this.contactInfo.controls.firstName.setValue(this.contactData['firstName']);
    this.contactInfo.controls.lastName.setValue(this.contactData['lastName']);
    this.contactInfo.controls.organization.setValue(this.contactData['organization']);
    this.contactInfo.controls.position.setValue(this.contactData['position']); */
  }

  addPhoneForm(type: String, number: String) {
    let formArray = <FormArray>this.contactInfo.controls['phoneNumbers'];
    formArray.push(
      new FormGroup({
        type: this.formBuilder.control({ value: type, disabled: false }),
        number: this.formBuilder.control({ value: number, disabled: false })
      })
    );
  }

  addWebsiteForm(url: String) {
    let formArray = <FormArray>this.contactInfo.controls['websites'];
    formArray.push(new FormControl(url));
  }

  removePhoneForm(index: number) {
    let formArray = <FormArray>this.contactInfo.controls.phoneNumbers;
    formArray.removeAt(index);
  }

  removeWebsiteForm(index: number) {
    let formArray = <FormArray>this.contactInfo.controls['websites'];
    formArray.removeAt(index);
  }

  setData() {
    console.log(this.contactInfo.controls['websites']);
    console.log(this.contactInfo.getRawValue());
    this.dataToSet.emit(this.contactInfo.getRawValue());
  }
}
