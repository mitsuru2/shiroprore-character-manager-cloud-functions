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
});

exports.logUsersDeleteEvent = functions.region('asia-northeast1').firestore.document('/Users/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Users',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
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
});

exports.logAbilitiesDeleteEvent = functions.region('asia-northeast1').firestore.document('/Abilities/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'Abilities',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
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
});

exports.logCharacterTagsDeleteEvent = functions.region('asia-northeast1').firestore.document('/CharacterTags/{documentId}').onDelete((snap, context) => {
  const deleteData = snap.data();

  functions.logger.log({
    collection: 'CharacterTags',
    operation: 'Delete',
    docId: context.params.documentId,
    data: deleteData,
  });
});
