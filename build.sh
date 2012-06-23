#! /bin/sh
cd oniguruma
emconfigure ./configure
make
cd .libs

API="[
	'onig_init', 'onig_end', 'onig_version',
	'onig_error_code_to_str', 'onig_set_warn_func', 'onig_set_verb_warn_func',
	'onig_new', 'onig_new_without_alloc', 'onig_new_deluxe',
	'onig_free', 'onig_free_body',
	'onig_search', 'onig_match',
	'onig_region_new', 'onig_region_free', 'onig_region_copy', 'onig_region_clear', 'onig_region_resize',
	'onig_name_to_group_numbers', 'onig_name_to_backref_number',
	'onig_foreach_name',
	'onig_number_of_names', 'onig_number_of_captures', 'onig_number_of_capture_histories',
	'onig_get_encoding', 'onig_get_options', 'onig_get_case_fold_flag', 'onig_get_syntax',
	'onig_get_capture_tree', 'onig_capture_tree_traverse', 'onig_noname_group_capture_is_active',
	'onigenc_get_prev_char_head', 'onigenc_get_left_adjust_char_head', 'onigenc_get_right_adjust_char_head',
	'onigenc_strlen', 'onigenc_strlen_null', 'onigenc_str_bytelen_null',
	'onig_set_default_syntax', 'onig_copy_syntax',
	'onig_get_syntax_op', 'onig_get_syntax_op2', 'onig_get_syntax_behavior', 'onig_get_syntax_options',
	'onig_set_syntax_op', 'onig_set_syntax_op2', 'onig_set_syntax_behavior', 'onig_set_syntax_options',
	'onig_copy_encoding',
	'onig_set_meta_char',
	'onig_get_default_case_fold_flags', 'onig_set_default_case_fold_flags',
	'onig_get_match_stack_limit_size', 'onig_set_match_stach_limit_size'
]"

emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API libonig.so -o ../../libonig.js
emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API -O2 libonig.so -o ../../libonig.O2.js
emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API -O3 libonig.so -o ../../libonig.O3.js
