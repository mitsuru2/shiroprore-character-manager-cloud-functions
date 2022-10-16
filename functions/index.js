// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

/** Check if the input arrays are same or not.
 * @param {any[]} a Input array a.
 * @param {any[]} b input array b.
 * @return {boolean} True if the input array is not same.
 */
function isArrayChanged(a, b) {
  if (a.length !== b.length) {
    return true;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return true;
    }
  }

  return false;
}

/**
 * Check if the input two arrays are same or not.
 * @param {AbilityAttr[]} a Input ability attribute array 1.
 * @param {AbilityAttr[]} b Input ability attribute array 2.
 * @return {boolean} True if the input arrays are 'not' same.
 */
function isAbilityAttrChanged(a, b) {
  if (a.length !== b.length) {
    return true;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i].type !== b[i].type) {
      return true;
    } else if (a[i].value !== b[i].value) {
      return true;
    } else if (a[i].isStepEffect !== b[i].isStepEffect) {
      return true;
    }
  }

  return false;
}

// ==============================================================================
// Firestore: Users
//
exports.logUsersUpdateEvent = functions.region('asia-northeast1').firestore.document('/Users/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else if (isArrayChanged(prevData.characters, newData.characters)) {
    fieldName = 'characters';
    fieldValues.push(prevData.characters);
    fieldValues.push(newData.characters);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'Users',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logUsersCreateEvent = functions.region('asia-northeast1').firestore.document('/Users/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'Users',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logUsersDeleteEvent = functions.region('asia-northeast1').firestore.document('/Users/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Users',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: Abilities
//
exports.logAbilitiesUpdateEvent = functions.region('asia-northeast1').firestore.document('/Abilities/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else if (prevData.type !== newData.type) {
    fieldName = 'type';
    fieldValues.push(prevData.type);
    fieldValues.push(newData.type);
  } else if (prevData.cost !== newData.cost) {
    fieldName = 'cost';
    fieldValues.push(prevData.cost);
    fieldValues.push(newData.cost);
  } else if (prevData.interval !== newData.interval) {
    fieldName = 'interval';
    fieldValues.push(prevData.interval);
    fieldValues.push(newData.interval);
  } else if (isArrayChanged(prevData.descriptions, newData.descriptions)) {
    fieldName = 'descriptions';
    fieldValues.push(prevData.descriptions);
    fieldValues.push(newData.descriptions);
  } else if (isArrayChanged(prevData.tokenLayouts, newData.tokenLayouts)) {
    fieldName = 'tokenLayouts';
    fieldValues.push(prevData.tokenLayouts);
    fieldValues.push(newData.tokenLayouts);
  } else if (isAbilityAttrChanged(prevData.attributes, newData.attributes)) {
    fieldName = 'attributes';
    fieldValues.push(prevData.attributes);
    fieldValues.push(newData.attributes);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'Abilities',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logAbilitiesCreateEvent = functions.region('asia-northeast1').firestore.document('/Abilities/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'Abilities',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logAbilitiesDeleteEvent = functions.region('asia-northeast1').firestore.document('/Abilities/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Abilities',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: CharacterTags
//
exports.logCharacterTagsUpdateEvent = functions.region('asia-northeast1').firestore.document('/CharacterTags/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'CharacterTags',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logCharacterTagsCreateEvent = functions.region('asia-northeast1').firestore.document('/CharacterTags/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'CharacterTags',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logCharacterTagsDeleteEvent = functions.region('asia-northeast1').firestore.document('/CharacterTags/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'CharacterTags',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: Characters
//
exports.logCharactersUpdateEvent = functions.region('asia-northeast1').firestore.document('/Characters/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else if (prevData.type !== newData.type) {
    fieldName = 'type';
    fieldValues.push(prevData.type);
    fieldValues.push(newData.type);
  } else if (prevData.subType !== newData.subType) {
    fieldName = 'subType';
    fieldValues.push(prevData.subType);
    fieldValues.push(newData.subType);
  } else if (prevData.rarerity !== newData.rarerity) {
    fieldName = 'rarerity';
    fieldValues.push(prevData.rarerity);
    fieldValues.push(newData.rarerity);
  } else if (prevData.cost !== newData.cost) {
    fieldName = 'cost';
    fieldValues.push(prevData.cost);
    fieldValues.push(newData.cost);
  } else if (prevData.costKai !== newData.costKai) {
    fieldName = 'costKai';
    fieldValues.push(prevData.costKai);
    fieldValues.push(newData.costKai);
  } else if (prevData.weaponType !== newData.weaponType) {
    fieldName = 'weaponType';
    fieldValues.push(prevData.weaponType);
    fieldValues.push(newData.weaponType);
  } else if (isArrayChanged(prevData.geographTypes, newData.geographTypes)) {
    fieldName = 'geographTypes';
    fieldValues.push(prevData.geographTypes);
    fieldValues.push(newData.geographTypes);
  } else if (prevData.region !== newData.region) {
    fieldName = 'region';
    fieldValues.push(prevData.region);
    fieldValues.push(newData.region);
  } else if (isArrayChanged(prevData.voiceActors, newData.voiceActors)) {
    fieldName = 'voiceActors';
    fieldValues.push(prevData.voiceActors);
    fieldValues.push(newData.voiceActors);
  } else if (isArrayChanged(prevData.illustrators, newData.illustrators)) {
    fieldName = 'illustrators';
    fieldValues.push(prevData.illustrators);
    fieldValues.push(newData.illustrators);
  } else if (isArrayChanged(prevData.tags, newData.tags)) {
    fieldName = 'tags';
    fieldValues.push(prevData.tags);
    fieldValues.push(newData.tags);
  } else if (isArrayChanged(prevData.internalTags, newData.internalTags)) {
    fieldName = 'internalTags';
    fieldValues.push(prevData.internalTags);
    fieldValues.push(newData.internalTags);
  } else if (isArrayChanged(prevData.motifWeapons, newData.motifWeapons)) {
    fieldName = 'motifWeapons';
    fieldValues.push(prevData.motifWeapons);
    fieldValues.push(newData.motifWeapons);
  } else if (isArrayChanged(prevData.motifFacilities, newData.motifFacilities)) {
    fieldName = 'motifFacilities';
    fieldValues.push(prevData.motifFacilities);
    fieldValues.push(newData.motifFacilities);
  } else if (isArrayChanged(prevData.abilities, newData.abilities)) {
    fieldName = 'abilities';
    fieldValues.push(prevData.abilities);
    fieldValues.push(newData.abilities);
  } else if (isArrayChanged(prevData.abilitiesKai, newData.abilitiesKai)) {
    fieldName = 'abilitiesKai';
    fieldValues.push(prevData.abilitiesKai);
    fieldValues.push(newData.abilitiesKai);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'Characters',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logCharactersCreateEvent = functions.region('asia-northeast1').firestore.document('/Characters/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'Characters',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logCharactersDeleteEvent = functions.region('asia-northeast1').firestore.document('/Characters/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Characters',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: Facilities
//
exports.logFacilitiesUpdateEvent = functions.region('asia-northeast1').firestore.document('/Facilities/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else if (prevData.type !== newData.type) {
    fieldName = 'type';
    fieldValues.push(prevData.type);
    fieldValues.push(newData.type);
  } else if (prevData.rarerity !== newData.rarerity) {
    fieldName = 'rarerity';
    fieldValues.push(prevData.rarerity);
    fieldValues.push(newData.rarerity);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'Facilities',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logFacilitiesCreateEvent = functions.region('asia-northeast1').firestore.document('/Facilities/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'Facilities',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logFacilitiesDeleteEvent = functions.region('asia-northeast1').firestore.document('/Facilities/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Facilities',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: Illustrators
//
exports.logIllustratorsUpdateEvent = functions.region('asia-northeast1').firestore.document('/Illustrators/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'Illustrators',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logIllustratorsCreateEvent = functions.region('asia-northeast1').firestore.document('/Illustrators/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'Illustrators',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logIllustratorsDeleteEvent = functions.region('asia-northeast1').firestore.document('/Illustrators/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Illustrators',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: VoiceActors
//
exports.logVoiceActorsUpdateEvent = functions.region('asia-northeast1').firestore.document('/VoiceActors/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'VoiceActors',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logVoiceActorsCreateEvent = functions.region('asia-northeast1').firestore.document('/VoiceActors/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'VoiceActors',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logVoiceActorsDeleteEvent = functions.region('asia-northeast1').firestore.document('/VoiceActors/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'VoiceActors',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Firestore: Weapons
//
exports.logWeaponsUpdateEvent = functions.region('asia-northeast1').firestore.document('/Weapons/{documentId}').onUpdate((snap, context) => {
  const newData = snap.after.data();
  const prevData = snap.before.data();
  let fieldName = '';
  const fieldValues = [];

  if (prevData.name !== newData.name) {
    fieldName = 'name';
    fieldValues.push(prevData.name);
    fieldValues.push(newData.name);
  } else if (prevData.type !== newData.type) {
    fieldName = 'type';
    fieldValues.push(prevData.type);
    fieldValues.push(newData.type);
  } else if (prevData.rarerity !== newData.rarerity) {
    fieldName = 'rarerity';
    fieldValues.push(prevData.rarerity);
    fieldValues.push(newData.rarerity);
  } else {
    // Unexpected pattern. Log all data.
    fieldName = 'all';
    fieldValues.push(prevData);
    fieldValues.push(newData);
  }

  functions.logger.log({
    collection: 'Weapons',
    operation: 'Update',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    field: fieldName,
    prev: fieldValues[0],
    new: fieldValues[1]});

  return true;
});

exports.logWeaponsCreateEvent = functions.region('asia-northeast1').firestore.document('/Weapons/{documentId}').onCreate((snap, context) => {
  const newData = snap.data();

  functions.logger.log({
    collection: 'Weapons',
    operation: 'Create',
    docId: context.params.documentId,
    updatedAt: newData.updatedAt.toDate().toISOString(),
    updatedBy: newData.updatedBy,
    data: newData,
  });
  return true;
});

exports.logWeaponsDeleteEvent = functions.region('asia-northeast1').firestore.document('/Weapons/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Weapons',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
  return true;
});

// ==============================================================================
// Cloud Storage
//
exports.logStorageFinalizeEvent = functions.region('asia-northeast1').storage.object().onFinalize((metadata) => {
  functions.logger.log({
    operation: 'Finalize',
    metadata: metadata,
  });
  return true;
});

exports.logStorageDeleteEvent = functions.region('asia-northeast1').storage.object().onDelete((metadata) => {
  functions.logger.log({
    operation: 'Delete',
    metadata: metadata,
  });
  return true;
});
