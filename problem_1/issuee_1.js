const fs = require('fs')

try {
	// read contents of the file
	const data = fs.readFileSync('instructions.txt', 'UTF-8');

	// split the contents by new line
	const lines = data.split(/\r?\n/);

	let message = [];

	// print all lines
	lines.forEach((line) => {
		message.push( line.trim() );
	});

	console.log( message );
	let array_caracteres =  message[0].split(' '); 

	// if( array_caracteres[0] > 2 && array_caracteres[0] < 50 )
	// 	console.log( array_caracteres[0] > 2 && array_caracteres[0] < 50 )

	// if( array_caracteres[1] > 2 && array_caracteres[1] < 50 )
	// 	console.log( array_caracteres[1] > 2 && array_caracteres[1] < 50 )

	// if( array_caracteres[2] > 3 && array_caracteres[2] < 5000 )
	// 	console.log( array_caracteres[2] > 3 && array_caracteres[2] < 5000 )

	decrypt_message( message );

} catch (err) {
	console.error(err);
}

function decrypt_message( array_message ) {

	//let origin = 'XcamakCeseAlFuegoDLKmN';
	//let string_encrypt = 'XXcaaamakkCCessseAAllFueeegooDLLKmmNNN';
	let string_encrypt = array_message[3];
	let new_string_encrypt = '';
	//console.log( origin );
	//console.log( string_encrypt );

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

	let re = new RegExp(array_message[1], 'g');
	new_string_encrypt.match(re);
	console.log( new_string_encrypt.match(re) );


	let re2 = new RegExp(array_message[2], 'g');
	new_string_encrypt.match(re2);
	console.log( new_string_encrypt.match(re2) );

}

//TODO: Falta el regex que encuentre el mensaje y leer archivos con node