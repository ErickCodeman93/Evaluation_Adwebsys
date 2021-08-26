
def found_winner( round, markers_numbers, markers ):

	if round == markers_numbers:
		
		mylist      = markers
		firts_list  = []
		two_list    = []

		for x in mylist:

			if int( x[0] ) > int( x[1] ):
				print( 'El primer jugador es lider' )
				print( x[0] , x[1] )
				print( 'La ventaja es de ', ( int( x[0] ) - int( x[1] ) ) )
				firts_list.append( ( int( x[0] ) - int( x[1] ) ) )

			if int( x[0] ) < int( x[1] ) :
				print( 'El segundo jugador es lider' )
				print( x[0] , x[1] )
				print( 'La ventaja es de ', ( int( x[1] ) - int( x[0] ) ) )
				two_list.append( ( int( x[1] ) - int( x[0] ) ) )

		# Alghorim sorted
		firts_list.sort()
		firts_list.reverse()
		print( firts_list ) 
		two_list.sort()
		two_list.reverse()
		print( two_list )

		if firts_list[0] > two_list[0]:
			print('El primer jugador Gana por la ventaja', firts_list[0] )

		if two_list[0] > firts_list[0]:
			print('El segundo jugador Gana por la ventaja', two_list[0] )
			
	else:
		print('No coinciden el numero de rondas con los marcadores en el archivo')


# Read file 
f = open( "demogamefile.txt", "r" )

# markers 
markers = []

#Set markers
for x in f:
	markers.append( x.split() )

# number of rounds
round = int( markers[0] [0] )

markers.pop(0)
# number of markers
markers_numbers = int( len( markers ) )

found_winner( round, markers_numbers, markers )