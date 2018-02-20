<?php

namespace App\Common;

class RandomString
{

    /*
 * Create a random string
 * @author	XEWeb <>
 * @param $length the length of the string to create
 * @return $str the string
 */
    function randomString($length = 6) {
        $str = "";
        $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
        $max = count($characters) - 1;
        for ($i = 0; $i < $length; $i++) {
            $rand = mt_rand(0, $max);
            $str .= $characters[$rand];
        }
        return $str;
    }

}