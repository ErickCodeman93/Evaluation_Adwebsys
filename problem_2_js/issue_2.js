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
		this.argv = argv
		this.inputFile = ''
		this.outputFile= ''
		this.round = 0
		this.markers_numbers = 0
		this.markers = []
		this.winner_by_advantage = 0
		this.player = 0
		this.result_by_round = 0
	} //end constructor

	existFile() {

		try {
			if ( ! ( fs.existsSync( this.argv.i ) && fs.existsSync( this.argv.i ) ) )	
				throw new Error('node issue_2 -i <inputFile> -o <outputFile> or node issue_2 --ifile <inputFile> --ofile <outputFile>');

			this.inputFile = this.argv.i;
			this.outputFile = this.argv.o;

		} //end try 
		catch (e) {
			console.error( e.message )
		} //end catch
		 
	} //end methond

	getRounds(){

		try {
			
			const data = fs.readFileSync( this.inputFile, 'UTF-8');
			// split the contents by new line
			const lines = data.split(/\n/);

			let message = [];

			// print all lines
			lines.forEach((line) => {
				message.push( line.trim() );
			});

			console.log( message );
			//throw new Error( "No coinciden el número de rondas con los marcadores en el archivo " +  this.inputFile );
			
		} //end try 
		catch (e) {
			console.error( e.message )
		} //end catch
	} //end method

}  //end class 

const main = () => {

	let newGame = new GameScore(argv);
	newGame.existFile();
	newGame.getRounds();
} //end function

main();

