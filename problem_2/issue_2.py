import os

#Init File
def init_ ():

	if os.path.exists('result_error.txt'):
		os.remove('result_error.txt')

	if os.path.exists('result.txt'):
		os.remove('result.txt')

	if os.path.exists("demogamefile.txt"):
		# Read file 
		f = open( "demogamefile.txt", "r" )

		# markers 
		markers = []

		#Set markers
		for x in f:
			markers.append( x.split() )

		# Close file
		f.close()

		# number of rounds
		round = int( markers[0] [0] )

		markers.pop(0)
		# number of markers
		markers_numbers = int( len( markers ) )

		found_winner( round, markers_numbers, markers )
		
	else:
		create_file( "result_error.txt", "Se necesita el archivo demogamefile.txt para iniciar el programa :<" )

#Found Winner
def found_winner( round, markers_numbers, markers ):

	if round == markers_numbers:
		
		mylist      = markers
		firts_list  = []
		two_list    = []

		for x in mylist:

			if int( x[0] ) > int( x[1] ):
				firts_list.append( ( int( x[0] ) - int( x[1] ) ) )

			if int( x[0] ) < int( x[1] ) :
				two_list.append( ( int( x[1] ) - int( x[0] ) ) )

		# Alghorim sorted
		firts_list.sort()
		firts_list.reverse()
		
		two_list.sort()
		two_list.reverse()
		

		if firts_list[0] > two_list[0]:
			create_file( "result.txt", "%s %s"%( str( 1 ), str( firts_list[0] ) ) )

		if two_list[0] > firts_list[0]:
			create_file( "result.txt", "%s %s"%( str( 2 ), str( two_list[0] ) ) )
			
	else:
		create_file( "result_error.txt", "No coinciden el numero de rondas con los marcadores en el archivo" )

#Create File
def create_file( name_file, message ):
	if os.path.exists(name_file):
		os.remove(name_file)
	
	c = open(name_file, "x")
	c.write(message)
	c.close()

#Main function
init_()

