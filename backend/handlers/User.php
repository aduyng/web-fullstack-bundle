<?php

class User {
    public function current(&$response){
        if( !Zend_Registry::isRegistered('currentUser')){
            return 404;
        }
        $currentUser = Zend_Registry::get('currentUser');

        $response = array(
            'id' => (int)$currentUser->id,
            'fullname' => $currentUser->fullname,
            'email' => $currentUser->email,
            'isSupporter' => $currentUser->isSupporter == 1
        );
        return 200;
    }

    public function signIn(&$response){

        if( Zend_Registry::isRegistered('currentUser')){
            return 400;
        }

        $currentUser = Zend_Registry::isRegistered('currentUser');
        if( !empty($currentUser) ){
            return 400;
        }
        $email = req('email');
        $password = req('password');

        if( empty($email) || empty($password) ){
            return 400;
        }
        include_once 'Zend/Db/Table.php';
        $userTable = new Zend_Db_Table('User');

        $select = $userTable
            ->select()
            ->from($userTable, array('id', 'email', 'fullname', 'isSupporter'))
            ->where('email = ?', $email)
            ->where('pwd = ?', sha1($password));
        $currentUser = $userTable->fetchRow($select);
        if(empty($currentUser) ){
            return 400;
        }
        $_SESSION['userId'] = $currentUser->id;

        $response = array(
            'id' => (int)$currentUser->id,
            'fullname' => $currentUser->fullname,
            'email' => $currentUser->email,
            'isSupporter' => $currentUser->isSupporter == 1
        );
        return 200;
    }

    public function signOut(&$response){
        if( !Zend_Registry::isRegistered('currentUser')){
            return 400;
        }

        $currentUser = Zend_Registry::isRegistered('currentUser');
        if( empty($currentUser) ){
            return 400;
        }

        unset($_SESSION['userId']);
        Zend_Registry::set('currentUser', null);
        return 200;
    }
}