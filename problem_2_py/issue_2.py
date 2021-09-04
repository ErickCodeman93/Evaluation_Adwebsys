#!/usr/bin/python
import sys, getopt, os

class GameScore:

	def __init__( self, argv ):
		self.argv = argv
		self.inputFile = ''
		self.outputFile= ''
		self.round = 0
		self.markers_numbers = 0
		self.markers = []
		self.winner_by_advantage = 0
		self.player = 0
		self.result_by_round = 0

	def existFile( self ):
		try :
			opts, args = getopt.getopt( self.argv, "i:o:", [ "ifile=", "ofile="] )

			for opt, arg in opts:
				if opt in ( "-i", "--ifile" ):
					self.inputFile = arg
				elif opt in ( "-o","--ofile"  ):
					self.outputFile = arg

			if not( os.path.exists( self.inputFile ) ):
				raise getopt.GetoptError('')

		except getopt.GetoptError:
			print('issue_2.py -i <inputFile> -o <outputFile>')
			print('issue_2.py --ifile <inputFile> --ofile <outputFile>')
			sys.exit()

	def getRounds(self):
		
		try :
			# Read file 
			f = open( self.inputFile, "r" )

			#Set markers
			for x in f:
				if ( x.isspace() ) == False:
					self.markers.append( x.split() )
			
			# Close file
			f.close()

			# number of rounds
			self.round = int( self.markers[0][0] )

			self.markers.pop(0)

			# number of markers
			self.markers_numbers = int( len( self.markers ) )

			if self.round != self.markers_numbers:
				raise Exception()

		except Exception as e:
			print("No coinciden el número de rondas con los marcadores en el archivo", self.inputFile )
			sys.exit()

	def searchWinner( self ):

		for x in self.markers:

			if int( x[0] ) > int( x[1] ):
				print( "Score de esta ronda: Jugador 1: %s, Jugador 2: %s "%( x[0], x[1] ) )
				print( "Ganador de esta ronda: %s, Ventaja: %s"%( "Jugador 1", ( int( x[0] ) - int( x[1] ) ) ) )
				self.calculateAdvantage( x[0], x[1], 1 )

			if int( x[0] ) < int( x[1] ) :
				print( "Score de esta ronda: Jugador 1: %s, Jugador 2: %s "%( x[0], x[1] ) )
				print( "Ganador de esta ronda: %s, Ventaja: %s"%( "Jugador 2", ( int( x[1] ) - int( x[0] ) ) ) )
				self.calculateAdvantage( x[1], x[0], 2 )

		print( 'Ganador Final:', self.player, self.winner_by_advantage )
		self.createFileResult()


	def calculateAdvantage( self, value_1, value_2, player ):
		
		if not self.result_by_round:
			self.result_by_round = ( int( value_1 ) - int( value_2 ) )
			self.winner_by_advantage = self.result_by_round
			self.player = player
			print( 'Jugador a la cabeza:', self.player, 'Ventaja:',self.winner_by_advantage , '\n')

		else:
			self.result_by_round = ( int( value_1 ) - int( value_2 ) )

			if self.result_by_round > self.winner_by_advantage:
				self.winner_by_advantage =  self.result_by_round
				self.player = player
				print( 'Jugador a la cabeza', self.player, ',Ventaja:', self.winner_by_advantage, '\n' )
			else :
				print( 'Jugador a la cabeza', self.player, ',Ventaja:', self.winner_by_advantage, '\n' )

	def createFileResult( self ):

		if os.path.exists( self.outputFile ):
			os.remove( self.outputFile )
		
		c = open(self.outputFile , "x")
		c.write("%s %s"%( str( self.player ), str( self.winner_by_advantage  ) ))
		c.close()



def main():

	newgame = GameScore(sys.argv[1:])
	newgame.existFile()
	newgame.getRounds()
	newgame.searchWinner()
	
if __name__ == "__main__":
	main()