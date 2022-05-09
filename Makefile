setup:
	docker volume create fanzone_client_nodemodules
	make install

# The following is a workaround to pass arguments to the script (e.g. make install validation)
install:
	docker-compose run --rm fanzone_client npm i $(filter-out $@, $(MAKECMDGOALS))
%:
	@:
