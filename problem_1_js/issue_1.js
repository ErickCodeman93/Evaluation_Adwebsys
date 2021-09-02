const fs = require('fs')

const argv1 = require('yargs')
			.option( 'i', {
				"alias" : "ifile",
				"type"	: "string",
				//"demandOption" : true
			})
			.option( 'o', {
				"alias" : "ofile",
				"type"	: "string",
				//"demandOption" : true
			})
			.check( ( argv, options ) => {

				if( !( argv.i && argv.o ) )
					throw 'node issue_1 -i <inputFile> -o <outputFile> or node issue_1 --ifile <inputFile> --ofile <outputFile>'
				
				return true;
			} )
			.argv;

class decryptMessage {

	constructor( argv ) {
		this.argv = argv;
		this.inputFile = '';
		this.outputFile = '';
		this.message = [];
	} //end constructor

	existFile() {

		try {

			if ( ! ( fs.existsSync( this.argv.i ) && fs.existsSync( this.argv.o ) ) )
				throw new Error('1 node issue_1 -i <inputFile> -o <outputFile> or node issue_1 --ifile <inputFile> --ofile <outputFile>');

			this.inputFile = this.argv.i;
			this.outputFile = this.argv.o;
			
		} //end try 
		catch (e) {
			console.error( e.message );	
			process.exit();
		} //end catch
		 
	} //end methond

	decryptProcess(){

		try {

			let array = fs.readFileSync(this.inputFile).toString().split("\n");

			for(let i in array){
				if( array[i].trim() ){
					this.message.push( array[i].trim().split(' ') );
				} //end if
			} //end for

			let array_caracteres =  this.message[0]; 

			//Instrucción 1
			if( array_caracteres[0] < 2 )
				throw new Error( 'El minimo de caracteres son 2 para la instruccion 1 que intentas emitir' );

			if( array_caracteres[0] > 50 ) 
				throw new Error( 'Arrebasas el número permitido de caracteres para la instruccion 1 que intentas emitir' );


			if( parseInt( array_caracteres[0] ) != parseInt( this.message[1][0].length ) )
				throw new Error( 'El número de caracteres de la instrucción 1 no coincide con la longitud de la misma' );

			//Instrucción 2
			if( array_caracteres[1] < 2  )
				throw new Error( 'El minimo de caracteres son 2 para la instruccion 2 que intentas emitir' );

			if( array_caracteres[1] > 50 )				
				throw new Error( 'Arrebasas el número permitido de caracteres para la instruccion 2 que intentas emitir' );

			if( array_caracteres[1] != this.message[2][0].length ) 
				throw new Error( 'El número de caracteres de la instrucción 2 no coincide con la longitud de la misma' );

			//Mensaje
			if( array_caracteres[2] < 3  )
				throw new Error( 'El minimo de caracteres son 3 para el mensaje que intentas emitir' );

			if( array_caracteres[2] > 5000 )
				throw new Error( 'Arrebasas el número permitido de caracteres para el mensaje que intentas emitir' );

			if( array_caracteres[2] != this.message[3][0].length )
				throw new Error( 'El número de caracteres del mensaje no coincide con la longitud de la misma' );

			this.decrypt_message( this.message );

		} //end try 
		catch (e) {
			console.error( e.message );
			process.exit();
		} //end catch

	}//end method

	decrypt_message = ( array_message ) => {

		let string_encrypt = array_message[3][0];
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
		let re = new RegExp(array_message[1][0], 'g');
		new_string_encrypt.match(re);
		
		//Instruccion 2
		let re2 = new RegExp(array_message[2][0], 'g');
		new_string_encrypt.match(re2);
	
		if( new_string_encrypt.match(re) )
			this.create_file( this.outputFile, 'SI\nNO' );
		else if( new_string_encrypt.match(re2) )
			this.create_file( this.outputFile, 'NO\nSI' );
		else
			this.create_file( this.outputFile, 'No tenia instrucciones el mensaje' );
			
		console.log( "Éxito" );
	} //end function

	create_file = ( name_file, message ) => {

		if( fs.existsSync( this.argv.o ) )
			this.delete_file( this.outputFile );

		let result_file = fs.createWriteStream( name_file, {
			flags: 'a'
		})
	
		result_file.write( message + '\n')
	
	} //end function

	delete_file = path => fs.unlinkSync(path);

} //end class

const main = () => {

	let messageEncrypt = new decryptMessage(argv1);
	messageEncrypt.existFile();
	messageEncrypt.decryptProcess();
	
} //end function

main();