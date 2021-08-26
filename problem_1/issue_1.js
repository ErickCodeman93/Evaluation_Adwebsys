const fs = require('fs')

// Files
const path_error = './error.txt';
const path_result = './result.txt';

const init_ = () => {

	try {

		if ( fs.existsSync(path_error) ) 
			delete_file(path_error);

		if ( fs.existsSync(path_result) ) 
			delete_file(path_result);

		// read contents of the file
		const data = fs.readFileSync('instructions.txt', 'UTF-8');

		// split the contents by new line
		const lines = data.split(/\r?\n/);

		let message = [];

		// print all lines
		lines.forEach((line) => {
			message.push( line.trim() );
		});

		let array_caracteres =  message[0].split(' '); 

		//Instrucción 1
		if( array_caracteres[0] < 2 ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'El minimo de caracteres son 2 para la instruccion 1 que intentas emitir' );
			return;
		} // end if

		if( array_caracteres[0] > 50 ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'Arrebasas el número permitido de caracteres para la instruccion 1 que intentas emitir' );
			return;
		} //end if

		if( parseInt( array_caracteres[0] ) != parseInt( message[1].length ) ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'El número de caracteres de la instrucción 1 no coincide con la longitud de la misma' );
			return;
		} //end if

		//Instrucción 2
		if( array_caracteres[1] < 2  ){		
			create_file( 'error.txt', 'El minimo de caracteres son 2 para la instruccion 2 que intentas emitir' );
			return;
		} //end if

		if( array_caracteres[1] > 50 ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'Arrebasas el número permitido de caracteres para la instruccion 2 que intentas emitir' );
			return;
		} //end if

		if( array_caracteres[1] != message[2].length ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'El número de caracteres de la instrucción 2 no coincide con la longitud de la misma' );
			return;
		} //end if

		//Mensaje
		if( array_caracteres[2] < 3  ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'El minimo de caracteres son 3 para el mensaje que intentas emitir' );
			return;
		} //end if

		if( array_caracteres[2] > 5000 ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'Arrebasas el número permitido de caracteres para el mensaje que intentas emitir' );
			return;
		} //end if

		if( array_caracteres[2] != message[3].length ) {	
			console.log( "error: revisar archivo 'error.txt'" );	
			create_file( 'error.txt', 'El número de caracteres del mensaje no coincide con la longitud de la misma' );
			return;
		} //end if

		decrypt_message( message );

	} //end try 
	catch (err) {
		console.error(err);
	} //end catch

} //end function

const decrypt_message = ( array_message ) => {

	let string_encrypt = array_message[3];
	let new_string_encrypt = '';
	
	const clear_message = ( value ) => {

		let first_character = string_encrypt.charAt( parseInt(value) );
		let second_character = string_encrypt.charAt( parseInt(value) +1 );
	
		if( value < string_encrypt.length ){
	
			if( first_character !== second_character ){
				new_string_encrypt += first_character;
				console.log(new_string_encrypt);
			}
	
			return clear_message( value + 1);
		}
		
		return false;
	} //end function

	clear_message(0);

	//Instruccion 1
	let re = new RegExp(array_message[1], 'g');
	new_string_encrypt.match(re);
	
	//Instruccion 2
	let re2 = new RegExp(array_message[2], 'g');
	new_string_encrypt.match(re2);

	if( new_string_encrypt.match(re) )
		create_file( 'result.txt', 'SI\nNO' );
	else if( new_string_encrypt.match(re2) )
		create_file( 'result.txt', 'NO\nSI' );
	else
		create_file( 'result.txt', 'No tenia instrucciones el mensaje' );
		
	console.log( "Éxito: revisar el archivo 'result.txt'" );
} //end function

const create_file = ( name_file, message ) => {

	let logger = fs.createWriteStream( name_file, {
		flags: 'a'
	})

	logger.write( message + '\n')

} //end function

const delete_file = path => fs.unlinkSync(path);

//Main Function
init_()