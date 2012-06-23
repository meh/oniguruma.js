#! /bin/sh

if [[ $1 == '2' && ! -f libonig.O2.js ]]; then
	NEEDS_DEPENDENCIES=true
elif [[ $1 == '3' && ! -f libonig.O3.js ]]; then
	NEEDS_DEPENDENCIES=true
elif [[ ! -f libonig.js ]]; then
	NEEDS_DEPENDENCIES=true
fi

if [[ $NEEDS_DEPENDENCIES ]]; then
	API+="["
	API+="'_onig_init','_onig_end','_onig_version',"
	API+="'_onig_error_code_to_str','_onig_set_warn_func','_onig_set_verb_warn_func',"
	API+="'_onig_new','_onig_new_without_alloc','_onig_new_deluxe',"
	API+="'_onig_free','_onig_free_body',"
	API+="'_onig_search','_onig_match',"
	API+="'_onig_region_new','_onig_region_free','_onig_region_copy','_onig_region_clear','_onig_region_resize',"
	API+="'_onig_name_to_group_numbers','_onig_name_to_backref_number',"
	API+="'_onig_foreach_name',"
	API+="'_onig_number_of_names','_onig_number_of_captures','_onig_number_of_capture_histories',"
	API+="'_onig_get_encoding','_onig_get_options','_onig_get_case_fold_flag','_onig_get_syntax',"
	API+="'_onig_get_capture_tree','_onig_capture_tree_traverse','_onig_noname_group_capture_is_active',"
	API+="'_onigenc_get_prev_char_head','_onigenc_get_left_adjust_char_head','_onigenc_get_right_adjust_char_head',"
	API+="'_onigenc_strlen','_onigenc_strlen_null','_onigenc_str_bytelen_null',"
	API+="'_onig_set_default_syntax','_onig_copy_syntax',"
	API+="'_onig_get_syntax_op','_onig_get_syntax_op2','_onig_get_syntax_behavior','_onig_get_syntax_options',"
	API+="'_onig_set_syntax_op','_onig_set_syntax_op2','_onig_set_syntax_behavior','_onig_set_syntax_options',"
	API+="'_onig_copy_encoding',"
	API+="'_onig_set_meta_char',"
	API+="'_onig_get_default_case_fold_flags','_onig_set_default_case_fold_flags',"
	API+="'_onig_get_match_stack_limit_size','_onig_set_match_stach_limit_size'"
	API+="]"

	cd oniguruma
	emconfigure ./configure || exit 1
	make || exit 1
	cd .libs

	emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API libonig.so -o ../../libonig.js || exit 1
	emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API -O2 libonig.so -o ../../libonig.O2.js || exit 1
	emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API -O3 libonig.so -o ../../libonig.O3.js || exit 1

	cd ../..
fi

if [[ $1 == '2' ]]; then
	cat libonig.O2.js helpers.js wrapper.js > oniguruma.js
elif [[ $1 == '3' ]]; then
	cat libonig.O3.js helpers.js wrapper.js > oniguruma.js
else
	cat libonig.js helpers.js wrapper.js > oniguruma.js
fi
