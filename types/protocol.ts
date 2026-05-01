export interface ProtocolFormData {
  accidentDate: string;
  accidentTime: string;

  participantAName: string;
  participantASurname: string;
  participantABirthDate: string;
  participantAPhone: string;
  participantACarNumber: string;

  licenseNumber: string;
  licenseCategory: string;
  licenseValidUntil: string;
  licenseCountry: string;

  damageSide: string;
  damageDescription: string;
}

export type RootStackParamList = {
  Home: undefined;
  DateTime: undefined;
  ParticipantA: undefined;
  LicenseData: undefined;
  DamageType: undefined;
  Summary: undefined;
};
