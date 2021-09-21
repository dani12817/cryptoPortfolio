import { FormGroup, AbstractControl, FormArray } from '@angular/forms';

export class FormClass {
  formGroup: FormGroup;
  private validationMessages: any = {
    required: 'Este campo es obligatorio',
    pattern: 'Patrón erróneo',
    validateVatId: 'El DNI introducido es erróneo',
    onlyNumbers: 'Este campo solo admite números',
    notValidRange: 'Rango no valido'
  };

  constructor(formGroup: any, validationMessages?: any) {
    if (validationMessages) {
      this.validationMessages = validationMessages;
    }
    this.formGroup = formGroup;
  }

  /**
   * Comprueba si el campo del formulario pasado como parámetro tiene algún error según sus Validators.
   * @param {string} field Campo del formulario a comprobar.
   * @return {string} String con el error que tiene el campo pasado como parámetro.
   */
  hasError(field: string): string | boolean {
    if (this.formGroup.get(field).errors !== undefined && this.formGroup.get(field).errors !== null) {
      const errors = Object.keys(this.formGroup.get(field).errors);
      if (errors.length > 0) {
        return this.validationMessages[errors[0]];
      }
    }
    return '';
  }


  /**
   * Comprueba si el campo FormArray del formulario pasado como parámetro tiene algún error según sus Validators.
   * @param {string} formArray FormArray a comprobar.
   * @param {number} index Índice del FormArray a comprobar.
   * @param {string} field Campo del FormArray a comprobar.
   * @return {string} String con el error que tiene el campo pasado como parámetro.
   */
  arrayHasError(formArray: string, index: number, field: string): string | boolean {
    let fieldControl: AbstractControl = (this.formGroup.get(formArray) as FormArray).at(index).get(field);
    if (fieldControl.errors !== undefined && fieldControl.errors !== null) {
      const errors = Object.keys(fieldControl.errors);
      if (errors.length > 0) {
        return this.validationMessages[errors[0]];
      }
    }
    return '';
  }

  /**
   * Comprueba si los valores del formulario 'formGroup' son correctos según sus Validators.
   * @return {boolean} Boolean con el resultado.
   */
  formIsInvalid(): boolean {
    if (this.formGroup.status === "VALID") {
      return false;
    }
    return true;
  }

  /**
   * Devuelve el 'value' del FormGroup incluyendo los 'disable'.
   */
  getAllValue() {
    return this.formGroup.getRawValue();
  }

  /**
   * Devuelve el 'value' del FormGroup.
   */
  getValue() {
    return this.formGroup.value;
  }

  /**
   * Devuelve el campo del FromGroup pasado como parámetro.
   * @param {string} field Campo a buscar.
   * @return {AbstractControl} Objeto correspondiente al campo del FromGroup.
   */
  get(field: string): AbstractControl {
    return this.formGroup.get(field);
  }

  /**
   * Reestablece los valores de todos los campos del formulario.
   * @param {any} value Resets the control with an initial value, or an object that defines the initial value and disabled state.
   */
  reset(value?: any): void {
    this.formGroup.reset(value);
  }

  /**
   * Patches the value of the `FormGroup`. It accepts an object with control
   * names as keys, and does its best to match the values to the correct controls
   * in the group.
   *
   * It accepts both super-sets and sub-sets of the group without throwing an error.
   * @param value The object that matches the structure of the group.
   */
  patchValue(value: any) {
    this.formGroup.patchValue(value);
  }

  /**
   * Recalculates the value and validation status of the control.
   * @param opts Configuration options determine how the control propagates changes and emits events
   * after updates and validity checks are applied.
   */
  updateValueAndValidity(opts?: {onlySelf?: boolean, emitEvent?: boolean}): void {
    this.formGroup.updateValueAndValidity(opts);
  }

  /**
   * Añade un nuevo mensaje de error.
   * @param {string} name Identificador del error.
   * @param {string} errorMessage Mensaje que se mostrará cuando se tenga que mostrar el error.
   */
  addValidationMessage(name: string, errorMessage: string): void {
    this.validationMessages[name] = errorMessage;
  }
}