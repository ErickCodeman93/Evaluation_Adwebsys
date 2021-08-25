let origin = 'XcamakCeseAlFuegoDLKmN';
let string_encrypt = 'XXcaaamakkCCessseAAllFueeegooDLLKmmNNN';
let new_string_encrypt = '';
console.log( origin );
console.log( string_encrypt );

function test( value ){

    let first_character = string_encrypt.charAt( parseInt(value) );
    let second_character = string_encrypt.charAt( parseInt(value) +1 );

    if( value < string_encrypt.length ){

        if( first_character !== second_character ){
            new_string_encrypt += first_character;
            console.log(new_string_encrypt);
        }

        return test( value + 1);
    }
    
        return false;
}

test(0);

//TODO: Falta el regex que encuentre el mensaje y leer archivos con node