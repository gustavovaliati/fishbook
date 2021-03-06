/****************************************************************************
**
** www.celtab.org.br
**
** Copyright (C) 2013
**                     Gustavo Valiati <gustavovaliati@gmail.com>
**                     Luis Valdes <luisvaldes88@gmail.com>
**                     Thiago R. M. Bitencourt <thiago.mbitencourt@gmail.com>
**
** This file is part of the FishBook project
**
** This program is free software; you can redistribute it and/or
** modify it under the terms of the GNU General Public License
** as published by the Free Software Foundation; version 2
** of the License.
**
** This program is distributed in the hope that it will be useful,
** but WITHOUT ANY WARRANTY; without even the implied warranty of
** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
** GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License
** along with this program; if not, write to the Free Software
** Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
**
****************************************************************************/

var SessionHandler = require('./session')
  , ContentHandler = require('./content')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);

    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);  

    // Entries GET
    app.get('/', contentHandler.displayMainPage);
    app.get('/institutions', contentHandler.displayInstitutions);
    app.get('/species', contentHandler.displaySpecies);
    app.get('/collectors', contentHandler.displayCollectors);
    app.get('/tagged_fishes', contentHandler.displayTaggedFishes);
    app.get('/users', contentHandler.displayUsers);
    app.get('/mon_collectors', contentHandler.displayMonCollectors);
    app.get('/mon_activities', contentHandler.displayMonActivities);
    app.get('/profile', contentHandler.displayProfile);
    app.get('/search_rfids', contentHandler.displaySearchRFIDs);
    app.get('/import', contentHandler.displayImport);

    // ##### GET for add_ *forms
    app.get('/add_institutions', contentHandler.displayAddInstitutions);
    app.get('/add_species', contentHandler.displayAddSpecies);
    app.get('/add_collectors', contentHandler.displayAddCollectors);
    app.get('/add_tagged_fishes', contentHandler.displayAddTaggedFishes);
    app.get('/add_users', contentHandler.displayAddUsers);
    app.get('/update_collectors/:id', contentHandler.displayUpdateCollectors);
    app.get('/update_institutions/:id', contentHandler.displayUpdateInstitutions);
    app.get('/update_species/:id', contentHandler.displayUpdateSpecies);
    app.get('/update_tagged_fishes/:id', contentHandler.displayUpdateTaggedFishes);
    app.get('/update_tagged_fishes_pittag/:pittag', contentHandler.displayUpdateTaggedFishesPitTag);

    // Entries POST
    app.post('/add_institutions', contentHandler.handleAddInstitutions);
    app.post('/add_species', contentHandler.handleAddSpecies);
    app.post('/add_collectors', contentHandler.handleAddCollectors);
    app.post('/add_tagged_fishes', contentHandler.handleAddTaggedFishes);
    app.post('/add_users', contentHandler.handleAddUsers);

    app.post('/update_collectors', contentHandler.handleUpdateCollectors);
    app.post('/update_institutions', contentHandler.handleUpdateInstitutions);
    app.post('/update_species', contentHandler.handleUpdateSpecies);
    app.post('/update_tagged_fishes', contentHandler.handleUpdateTaggedFishes);
    app.post('/profile', contentHandler.handleProfile);

    app.post('/remove_collectors', contentHandler.handleRemoveCollectors);
    app.post('/remove_institutions', contentHandler.handleRemoveInstitutions);
    app.post('/remove_species', contentHandler.handleRemoveSpecies);
    app.post('/remove_tagged_fishes', contentHandler.handleRemoveTaggedFishes);
    
    app.post('/search_rfids', contentHandler.handleSearchRFIDs);
    app.post('/import', contentHandler.handleImport);

    // Collectors Summary JSON Service
    app.get('/collectors_summary', contentHandler.sendCollectionSummary);


    // Authentication
    app.post('/login', sessionHandler.handleLoginRequest);
    app.get('/logout', sessionHandler.displayLogoutPage);


    // Error handling middleware
    app.use(ErrorHandler);

}