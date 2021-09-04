const fs = require('fs');

const argv = require('yargs')
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
					throw 'node issue_2 -i <inputFile> -o <outputFile> or node issue_2 --ifile <inputFile> --ofile <outputFile>'
				
				return true;
			} )
			.argv;

class GameScore {

	constructor( argv ) {
		this.argv = argv;
		this.inputFile = '';
		this.outputFile = '';
		this.round = 0;
		this.markers_numbers = 0;
		this.markers = [];
		this.winner_by_advantage = 0;
		this.player = 0;
		this.result_by_round = 0;
	} //end constructor

	existFile() {

		try {
			if ( ! ( fs.existsSync( this.argv.i ) ) )	
				throw new Error('node issue_2 -i <inputFile> -o <outputFile> or node issue_2 --ifile <inputFile> --ofile <outputFile>');

			this.inputFile = this.argv.i;
			this.outputFile = this.argv.o;

		} //end try 
		catch (e) {
			console.error( e.message );
			process.exit();
		} //end catch
		 
	} //end methond

	getRounds(){

		try {
			
			let array = fs.readFileSync(this.inputFile).toString().split("\n");
			
			for(let i in array){
				if( array[i].trim() ){
					this.markers.push(  array[i].trim().split(' ') );
				} //end if
			} //end for
			
			this.round = this.markers[0];

			this.markers.shift();

			this.markers_numbers = this.markers.length;

			if ( this.round != this.markers_numbers)
				throw new Error( "No coinciden el número de rondas con los marcadores en el archivo " +  this.inputFile );
			
		} //end try 
		catch (e) {
			console.error( e.message );
			process.exit();
		} //end catch
	} //end method

	searchWinner(){

		for( let x of this.markers ){

			if ( parseInt( x[0] ) > parseInt( x[1] ) ){
				console.log( `Score de esta ronda: Jugador 1: ${x[0]}, Jugador 2: ${x[1]}` );
				console.log( `Ganador de esta ronda: Jugador 1, Ventaja: ${ parseInt( x[0] ) - parseInt( x[1] ) }` );
				this.calculateAdvantage( x[0], x[1], 1 )
			} //end if

			if ( parseInt( x[0] ) < parseInt( x[1] ) ){
				console.log( `Score de esta ronda: Jugador 1: ${x[0]}, Jugador 2: ${x[1]}` )
				console.log( `Ganador de esta ronda: Jugador 2, Ventaja: ${ parseInt( x[1] ) - parseInt( x[0] ) }` );
				this.calculateAdvantage( x[1], x[0], 2 )
			} //end if

		} //end for

		console.log( 'Ganador Final:', this.player, this.winner_by_advantage );
		this.createFileResult();

	} //end method

	calculateAdvantage( value_1, value_2, player ){
		
		if( ! parseInt( this.result_by_round ) ) {
			this.result_by_round = ( parseInt( value_1 ) - parseInt( value_2 ) );
			this.winner_by_advantage = this.result_by_round;
			this.player = player;
			console.log( 'Jugador a la cabeza:', this.player, 'Ventaja:',this.winner_by_advantage , '\n');
		} //end if
		else {

			this.result_by_round = ( parseInt( value_1 ) - parseInt( value_2 ) );

			if ( parseInt(this.result_by_round) > parseInt(this.winner_by_advantage) ){
				this.winner_by_advantage =  this.result_by_round;
				this.player = player;
				console.log( 'Jugador a la cabeza', this.player, ',Ventaja:', this.winner_by_advantage, '\n' );
			}
			else 
				console.log( 'Jugador a la cabeza', this.player, ',Ventaja:', this.winner_by_advantage, '\n' );

		} //end else

	} //end method

	createFileResult(){

		if( fs.existsSync( this.argv.o ) )
			this.delete_file(this.outputFile);

		let result_file = fs.createWriteStream( this.outputFile, {
			flags: 'a'
		})
	
		result_file.write( `${this.player} ${this.winner_by_advantage}` );
	
	} //end method

	delete_file( path ){
		fs.unlinkSync(path);
	} //end method

}  //end class 

const main = () => {

	let newGame = new GameScore(argv);
	newGame.existFile();
	newGame.getRounds();
	newGame.searchWinner();

} //end function

main();

