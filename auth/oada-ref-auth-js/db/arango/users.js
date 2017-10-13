/* Copyright 2014 Open Ag Data Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var bcrypt = require('bcryptjs');

var config = require('../../config');
var oadaLib = require('../../../../libs/oada-lib-arangodb');
var trace = require('debug')('trace:arango#user');

function findById(id, cb) {
  trace('findById: searching for user ', id);
  return oadaLib.users.findById(id)
    .then(u => u && Object.assign(u, {id: u._id, _id: undefined}))
    .asCallback(cb);
}

function findByUsername(username, cb) {
  trace('findByUsername: searching for user ', username);
  return oadaLib.users.findByUsername(username)
    .then(u => u && Object.assign(u, {id: u._id, _id: undefined}))
    .asCallback(cb);
}

function findByUsernamePassword(username, password, cb) {
  trace('findByUsername: searching for user ', username, ' with a password');
  return oadaLib.users.findByUsernamePassword(username, password)
    .then(u => u && Object.assign(u, {id: u._id, _id: undefined}))
    .asCallback(cb);
}

function findByOIDCToken(idtoken, cb) {
  trace('findByOIDCToken: searching for oidc token sub=', idtoken.sub,
      ', iss=', idtoken.iss);
  return oadaLib.users.findByOIDCToken(idtoken)
    .then(u => u && Object.assign(u, {id: u._id, _id: undefined}))
    .asCallback(cb);
}

function findByOIDCUsername(username, domain, cb) {
  trace('findByOIDCUsername: searching for oidc username', username,
      'at ', domain);
  return oadaLib.users.findByOIDCUsername(username, domain)
    .then(u => u && Object.assign(u, {id: u._id, _id: undefined}))
    .asCallback(cb);
}

module.exports = {
  findById: findById,
  findByUsernamePassword: findByUsernamePassword,
  findByUsername: findByUsername,
  findByOIDCToken: findByOIDCToken,
  findByOIDCUsername
};
