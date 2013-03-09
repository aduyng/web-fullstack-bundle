<?php
function isAllowed($packageName, $methodName)
{
    global $currentUser;
    switch ($packageName) {
        case 'Index':
            switch ($methodName) {
                case 'index':
                    if( empty($currentUser) ){
                        return 401;
                    }
                    return 200;
            }
            break;

        case 'User':
            switch ($methodName) {
                case 'signIn':
                    return 200;
                case 'signOut':
                    return 200;
                case 'current':

                    return 200;
            }
            break;
    }
    return 403;
}

